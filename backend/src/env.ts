import { cleanEnv, num } from 'envalid';

export default cleanEnv(process.env, {
    API_PORT: num({ devDefault: 8081 }),
});
