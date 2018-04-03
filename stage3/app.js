import crypto2 from 'crypto2'

crypto2.createKeyPair((err, privateKey, publicKey) => {
  const keyPair = {privateKey, publicKey}

  console.log('KEYS: ', keyPair)
  console.log(new Array(40).join('-'))

  const text = 'JavaScript Blockchain – czyli jak zrobić własną mini-cyfrowalutę'

  console.log('TEXT: ', text);
  console.log(new Array(40).join('-'))

  crypto2.sign(text, privateKey, (err, signature) => {

    console.log('SIGNATURE: ', signature)
    console.log(new Array(40).join('-'))

    crypto2.verify(text, keyPair.publicKey, signature, (err, isSignatureValid) => {

      console.log('IS SIGNATURE VALID: ', isSignatureValid);
      console.log(new Array(40).join('-'))

    });
  });
});
