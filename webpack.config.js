const path = require('path');

module.exports = {
  mode: 'development', // Puedes cambiar a 'production' para compilaciones de producción
  entry: './src/sqlish.ts', // Nuestro punto de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'sqlish.js', // Nombre del archivo de salida (puedes cambiarlo)
    library: {
      name: 'SQLish', // Nombre de tu librería (cómo se expondrá globalmente o al importar)
      type: 'umd', // Universal Module Definition - para compatibilidad amplia
    },
    globalObject: 'this', // Necesario para la compatibilidad UMD en diferentes entornos
    clean: true, // Limpia el directorio 'dist' antes de cada compilación
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Para archivos .ts y .tsx
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pegjs$/, // Para tus archivos de gramática Peggy
        use: [
          {
            loader: path.resolve(__dirname, 'src/loaders/peggy-loader.ts'),
          },
        ],
        type: 'javascript/auto',
      },
      // Aquí podrías añadir más reglas para CSS, imágenes, etc., si tu paquete los necesita.
    ],
  },
  resolve: {
    // Extensiones que Webpack intentará resolver automáticamente
    extensions: ['.tsx', '.ts', '.js', '.pegjs'],
  },
  devtool: 'source-map', // Genera source maps para facilitar la depuración
};
