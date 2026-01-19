import { Text, View, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export default function App() {
const [image, setImage] = useState<string | null>(null)
const [result, setResult] = useState<any>(null)

const pickImage = async () => {
const res = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
quality: 1,
})

if (!res.canceled) {
setImage(res.assets[0].uri)
upload(res.assets[0].uri)
}
}

const upload = async (uri: string) => {
const form = new FormData()
form.append('file', {
uri,
name: 'face.jpg',
type: 'image/jpeg'
} as any)

const res = await fetch('http://localhost:8000/analyze/face', {
method: 'POST',
body: form,
headers: { 'Content-Type': 'multipart/form-data' }
})

setResult(await res.json())
}

return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Button title="Upload Face" onPress={pickImage} />
{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
{result && (
<View>
<Text>Face Shape: {result.face_shape}</Text>
<Text>Symmetry: {result.symmetry}</Text>
{result.recommendations.map((r: string, i: number) => (
<Text key={i}>• {r}</Text>
))}
</View>
)}
</View>
)
}
