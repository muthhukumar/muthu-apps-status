module.exports = {
  apps: [
    {
      name: 'Server',
      script: 'vercel dev',
      ignore_watch: ['.'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
    {
      name: 'Remix',
      script: 'remix dev',
      ignore_watch: ['.'],
      env: {
        FORCE_COLOR: '1',
        NODE_ENV: process.env.NODE_ENV ?? 'development',
      },
    },
    {
      name: 'Postcss',
      script: 'postcss styles/**/*.css --base styles --dir ./other/postcss',
      autorestart: false,
      watch: ['./tailwind.config.js', './app/**/*.ts', './app/**/*.tsx', './styles/**/*.css'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        FORCE_COLOR: '1',
      },
    },
    {
      name: 'rsync',
      script: 'rsync -v --checksum -r other/postcss/ app/styles/',
      watch: ['other/postcss'],
      autorestart: false,
      env: {
        FORCE_COLOR: '1',
      },
    },
  ],
}
