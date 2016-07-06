let FIREBASE_URL

if (process.env.NODE_ENV !== 'production') { 
  FIREBASE_URL = 'https://bn5.wilddogio.com/'
}else{
  FIREBASE_URL = 'https://bn5s.wilddogio.com/'
}

export {FIREBASE_URL}
