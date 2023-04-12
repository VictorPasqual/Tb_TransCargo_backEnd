module.exports = {
    JWT_SECRET: 'sua_chave_secreta',
    JWT_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME || '86400',
};
