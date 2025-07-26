const modeENV = import.meta.env.MODE;
let config;
switch (modeENV) {
  case 'development':
    config = await import('./dev');
    break;
  case 'qa':
    config = await import('./qa');
    break;
  case 'production':
    config = await import('./prod');
    break;
  default:
    throw new Error(`Unknown mode: ${modeENV}`);
}

export default config.default;
