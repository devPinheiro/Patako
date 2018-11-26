const config = {
  production: {  
    secret: process.env.secret,
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT,
},
 development: {
    secret: "I_AME_GERER",
    MONGO_URI: 'mongodb://p_sam:samuel40@ds251210.mlab.com:51210/patako-api',
    port: 3000
 }
};

export const getConfig = env => config[env] || config.development;