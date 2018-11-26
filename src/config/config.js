const config = {
  production: {  
    secret: process.env.secret,
    MONGO_URI: 'mongodb://p_sam:samuel40@ds251210.mlab.com:51210/patako-api',
    port: process.env.PORT,
},
 development: {
    secret: "I_AME_GERER",
    MONGO_URI: 'mongodb://localhost/songAPI',
    port: 3700
 }
};

export const getConfig = env => config[env] || config.production;