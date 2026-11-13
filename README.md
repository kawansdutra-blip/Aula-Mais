# Welcome to your Expo app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Câmera e transcrição por voz

A captura do quadro usa `expo-camera`. A transcrição usa `expo-speech-recognition`, que requer código nativo no Android e no iOS; por isso, esses recursos não funcionam no Expo Go nessas plataformas. Depois de instalar as dependências, crie e instale um development build:

```bash
npx expo run:android
```

No macOS com Xcode, use `npx expo run:ios`. Após instalar o app de desenvolvimento, inicie o Metro com:

```bash
npx expo start --dev-client
```

No navegador, use `npx expo start --web`; câmera e reconhecimento de fala dependem do suporte e das permissões do navegador. O serviço de voz do dispositivo ou navegador pode enviar áudio ao próprio fornecedor para transcrição. O Aula-Mais não envia o áudio para um servidor próprio. As fotos capturadas ficam no cache do app e a associação com a disciplina e a aula é mantida enquanto a sessão do aplicativo estiver ativa; ainda não há sincronização ou persistência após encerrar o app.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
