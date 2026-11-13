import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '@/components/app-icon';
import { getAccessibilityColors, useAccessibility } from '@/context/accessibility';
import { useLessonArtifacts } from '@/context/lesson-artifacts';

export default function CameraCaptureScreen() {
  const { course = 'Matemática', lesson = 'Árvore Binária' } = useLocalSearchParams<{ course: string; lesson: string }>();
  const { appearance } = useAccessibility();
  const colors = getAccessibilityColors(appearance);
  const { addLessonPhoto } = useLessonArtifacts();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const capture = async () => {
    if (!cameraRef.current || !cameraReady || busy) return;
    setBusy(true);
    setMessage('');
    try {
      const result = await cameraRef.current.takePictureAsync({ quality: 0.88 });
      if (!result?.uri) throw new Error('A câmera não retornou uma imagem.');
      setPhotoUri(result.uri);
    } catch {
      setMessage('Não foi possível tirar a foto. Verifique se a câmera está disponível e tente novamente.');
    } finally {
      setBusy(false);
    }
  };

  const confirmPhoto = () => {
    if (!photoUri) return;
    addLessonPhoto(course, lesson, photoUri);
    router.back();
  };

  const buttonStyle = { minHeight: 48, borderRadius: 12, paddingHorizontal: 16, flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'center' as const, gap: 8 };

  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
    <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />
    <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, backgroundColor: colors.surface, borderBottomWidth: 1, borderColor: colors.border }}>
      <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Voltar para a aula" hitSlop={10}><AppIcon name="arrowBack" color={colors.text} /></Pressable>
      <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>Foto do quadro</Text>
    </View>
    <View style={{ flex: 1, padding: 14, gap: 12 }}>
      <Text style={{ color: colors.muted, lineHeight: 21 }}>A imagem será associada a {course} · {lesson}. O aplicativo não reconhece texto dentro das fotos.</Text>
      {permission?.granted ? photoUri ? <Image source={{ uri: photoUri }} resizeMode="contain" style={{ flex: 1, width: '100%', backgroundColor: '#101827', borderRadius: 16 }} /> : <View style={{ flex: 1, overflow: 'hidden', borderRadius: 16, backgroundColor: '#101827' }}>
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" onCameraReady={() => setCameraReady(true)} onMountError={() => setMessage('A câmera não pôde ser aberta neste dispositivo. Tente novamente ou confira as permissões.')}/>
      </View> : <View style={{ flex: 1, minHeight: 260, borderRadius: 16, padding: 22, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <AppIcon name="privacy" color={colors.blue} size={34} />
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Permita o acesso à câmera</Text>
        <Text style={{ color: colors.muted, textAlign: 'center', lineHeight: 21 }}>{permission?.canAskAgain === false ? 'O acesso foi bloqueado. Ative a câmera nas configurações do dispositivo e volte para esta tela.' : 'Usaremos a câmera apenas para fotografar o quadro ou os slides desta aula.'}</Text>
        {permission?.canAskAgain !== false ? <Pressable onPress={async () => { const response = await requestPermission(); if (!response.granted) setMessage('Permissão da câmera negada. Você pode continuar sem tirar foto ou permitir o acesso nas configurações do dispositivo.'); }} accessibilityRole="button" style={[buttonStyle, { backgroundColor: colors.blue, marginTop: 4 }]}><AppIcon name="privacy" color={appearance === 'Contraste máximo' ? '#000' : '#fff'} /><Text style={{ color: appearance === 'Contraste máximo' ? '#000' : '#fff', fontWeight: '700' }}>Permitir câmera</Text></Pressable> : null}
      </View>}
      {message ? <Text accessibilityRole="alert" style={{ color: '#b42318', lineHeight: 20 }}>{message}</Text> : null}
      {permission?.granted ? photoUri ? <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable onPress={() => { setPhotoUri(null); setCameraReady(false); setMessage(''); }} accessibilityRole="button" style={[buttonStyle, { flex: 1, borderWidth: 1, borderColor: colors.blue }]}><Text style={{ color: colors.blue, fontWeight: '700' }}>Refazer</Text></Pressable>
        <Pressable onPress={confirmPhoto} accessibilityRole="button" style={[buttonStyle, { flex: 1, backgroundColor: colors.blue }]}><AppIcon name="check" color={appearance === 'Contraste máximo' ? '#000' : '#fff'} /><Text style={{ color: appearance === 'Contraste máximo' ? '#000' : '#fff', fontWeight: '700' }}>Confirmar foto</Text></Pressable>
      </View> : <Pressable onPress={() => void capture()} disabled={!cameraReady || busy} accessibilityRole="button" accessibilityLabel="Tirar foto do quadro" style={[buttonStyle, { backgroundColor: cameraReady && !busy ? colors.blue : colors.border }]}><AppIcon name="camera" color={appearance === 'Contraste máximo' ? '#000' : '#fff'} /><Text style={{ color: appearance === 'Contraste máximo' ? '#000' : '#fff', fontWeight: '700' }}>{busy ? 'Capturando…' : cameraReady ? 'Tirar foto do quadro' : 'Preparando câmera…'}</Text></Pressable> : null}
    </View>
  </SafeAreaView>;
}
