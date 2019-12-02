import * as CryptoJS from 'crypto-js'
import * as sha512 from 'js-sha512'
const Cryptokey = CryptoJS.enc.Utf8.parse('c3a3aff9aaed423d8ad8115835a25339')
const Cryptoiv = CryptoJS.enc.Utf8.parse('d4760ccddd7b42738d5598f0023718a9')

function CryptoEncrypt(textCipher, serverSecretKey) {
  let encrypted
  if (serverSecretKey) {
    encrypted = CryptoJS.AES.encrypt(textCipher, serverSecretKey, {
      iv: Cryptoiv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
  } else {
    encrypted = CryptoJS.AES.encrypt(textCipher, Cryptokey, {
      iv: Cryptoiv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
  }
  return encrypted
    .toString()
    .replace(/\//g, ',,')
    .replace(/\+/g, '~')
}

function CryptoDecrypt(textEncypted) {
  textEncypted = textEncypted.replace(/,,/g, '/').replace(/~/g, '+')
  const decrypted = CryptoJS.AES.decrypt(textEncypted, Cryptokey, {
    iv: Cryptoiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

function sha512Encrypt(value) {
  try {
    // logConsole('sha512.sha512(value)', sha512.sha512(value))
    return sha512.sha512(value)
  } catch (err) {
    // logConsole('sha512.sha512(value)', err)
    return null
  }
}
export const encryptDecrypt = {
  CryptoDecrypt,
  CryptoEncrypt,
  sha512Encrypt,
}
