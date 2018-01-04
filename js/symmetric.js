let messageElem  = document.getElementById("message"),
    resultElem   = document.getElementById("result"),
	passwordElem = document.getElementById("password"),
    activityElem = document.getElementById("activity");
    
/** 
	Options for generating keys, we need to provide the number
	of bits for the keys, the larger the number the stronger 
	the keys are, but they become harder to generate, we need
	to provide a passphrase so we can later decrypt the keys.
**/
let keyOptions = {
	userIds: [{name: "", email: ""}],
	numBits: 1024,
	//you would get the passphrase from an input field normally
};

function addActivity(header,details)
{
	let pNode = document.createElement("p");
	let timestamp = new Date().toLocaleTimeString();
	pNode.innerHTML = "<b>"+timestamp+" - " + header + "</b><br/>"+details;
	activityElem.insertAdjacentElement('afterbegin',pNode);
}
function loadPuzzleMessage()
{
	var msg = `-----BEGIN PGP MESSAGE-----
Version: BCPG C# v1.6.1.0

hQEMA3VmEgBDxjDTAQf9HtpxlPW4zN+tE1XtAOPyWvgLOsErURbz5CaDtcDkZwKg
mhHnnnfanb4UX33FK6iD3kSAEoO1S0sYJeGUDohuHZIq89fm2H4wP7Lc/3kWTMXj
9/+Rid+/sHPgwAE4tRGHyirrZf+E3UnKoT2Xe2BKwKQGxVF20dsnHV6hsk9GO21V
COTKMqadYEVSjkDTYfyt3r3RKMvqXPj910cVXZga/x1CD3+vb1AoyioBBEl+H4uq
Z7M/9GYfG8tdOwT8i0VaZLYrsmuaErP84FiniWs6RZlOo/H8+6TYa24AInPIA5Nj
Tim229azdukFE74wMPhAJYQ+GfLYby0gdpumVcvz5Mksv5ZB9MD+9oEmyy23uF45
Jorn4zgVe0IJ+51shH+fLScHtKqpqUwlUIkaNMc=
=2pqj
-----END PGP MESSAGE-----
`;
	messageElem.value=msg;
	return false;
}


function encryptMessage()
{
	const options = {
		data: messageElem.value,
		passwords: passwordElem.value
	};
	addActivity("Encrypt","<dl>data</dl><dd>"+options.data+"</dd><dl>password</dl><dd>"+ options.passwords+"</dd>");

	openpgp.encrypt(options)
		.then((cipherText)=>{
			resultElem.value = cipherText.data;
			return Promise.resolve();
		})
		.catch((err)=>{
			// In case something goes wrong
			addActivity("<b>ERROR:"+err+"</b>");
		});
}

function decryptMessage()
{
	addActivity("Decrypt","message="+messageElem.value+"<br/>password:"+ passwordElem.value);
	
	openpgp.decrypt({
			//privateKey: privateKey,
			message: openpgp.message.readArmored(messageElem.value),
			"password": passwordElem.value
		})
		.then((decryptedData)=>{
			resultElem.value = decryptedData.data;
			return Promise.resolve();
		})
		.catch((err)=>{
			// In case something goes wrong
			addActivity("<b>ERROR:"+err+"</b>");
		});
}


/*
openpgp.generateKey(keyOptions)
	.then(key => {
		john.privateKey = key.privateKeyArmored;
		john.publicKey = key.publicKeyArmored;
		johnkey.innerHTML = "John's keys generated. Private: \r\n\r\n" + john.privateKey;
		return Promise.resolve();
	})
	.then(() => {
		// Using John's public key, we encrypt the contents of the email.
		const options = {
			data: JSON.stringify(email),
			//publicKeys:  openpgp.key.readArmored(john.publicKey).keys
			passwords: 'abc123',
		};
		unencrypted.innerHTML = "Plain text message : \r\n\r\n" + options.data;

		return openpgp.encrypt(options)
	})
	.then((cipherText)=>{
		// We get the cipherText which is the encrypted contents of the email.
		messageForJohn = cipherText.data;
		encrypted.innerHTML = "Encrypted message : \r\n\r\n" + messageForJohn;
		return Promise.resolve();		
	})
	.then(() => {
		/**
		   To decrypt the email, we now use John's private key, but before
		   we can actually use it, we need to decrypt it using the passphrase
		   we provided when we initialized the keys
	    **/
/*		let privateKey = openpgp.key.readArmored(john.privateKey).keys[0];

		let messageForJohn2 = `-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v2.5.4
Comment: http://openpgpjs.org

wy4ECQMIMWq2qM3OpZtg1jlcWW84k9T3pFjv98cN1HIsODUA6Cyn8hnGPP6b
1X8k0kgBJ3GxbzP3m2WIV5NlwfNxSGhisIij6rd42tVJ0t4a0atwmZcT1Trs
eU295+kF7+Dgjb7dJxvoF4PyN9exU0gNZj5zKti/ETA=
=fWcM
-----END PGP MESSAGE-----
`;

let messageForJohn2 = `-----BEGIN PGP MESSAGE-----
Version: BCPG C# v1.6.1.0

hQEMA9D0sZZM2s32AQf/Q2DB0JnLdlDY+xUIQrtrEAMXQIpyv43V1DELDp8B+6Qm
m0vXMFe43Cemkd1SK6sn0rfVg3O9wvp8suSNUvvOMv1yfrqaWacA6AbrugjffZSa
TrFOU1yQlr8atPNxcmdMyYkLEJfa8kFAyNYZjFGrD4nF5WkgiOGbiRWUE9fXbTrM
e3+HXqDcXiW3BVM8hEHmQ9/M5JqRIl4nVOel9Zfp0OxEs0Rh8usyrWaBH0amJcuE
bfkIkFJYYyTRWNePsXsCrJ4/CQsDNxh55OkrbxHagLeaYmevz+J1wgXiAfBrj/ZB
pj4y9Cv1l6dAxIUYdFVK+7eSe4Daaz2ZEvrSkNwXcskqets6AfgJ6BiK5e36o5KH
i+ds9IukM1+Hc0pdc4D8zpMsNTsUR9DOXuK3
=00Zr
-----END PGP MESSAGE-----
`;


let messageForJohn2 = `-----BEGIN PGP MESSAGE-----
Version: OpenPGP v2.0.8
Comment: https://sela.io/pgp/

wcBMA0fIisMeFHtFAQf/Wj0CE2KWIB/E87Sr1Re/oWqdy63vQaeCT7vi/PKVChKx
A5y9n2FbQh1gVMAQaosiOeEYYKqveMu4pe9n5QBzlOu2dJwUM75Iqjg4KCCFZu41
TXC5ckspKQm6BugcrSGph+nUpbaTHHY+Sdtf3U/XcE/xKRlkKEmY51BT+hmnQ/pb
mfnWOk/a3LuWA/TcGbTWHbb5+cVXP58eiUQ8ZRwZGMiOokUxnOwKwGHL1Hi/SL1g
ZlLr8pmwzryG9uLwvfUDGkRSZbYMlhU2aViSfTclI7YrtOFjhyrcvHRLphqUp3Yd
ZRu0JpDI36UDpvQcXr/42YSMGQCKYFg8cbwQlI+kDNJJAW6y4KhemaEnuYM7OQq7
6P3ocgYKF3RVcqQ8jamQyGBQKXbuurX0NEfHOZrhATGKjyW+2bSl5NoU4O8PZsuF
eQvJr1oNV4HGIg==
=cMU6
-----END PGP MESSAGE-----
`;

let messageForJohn2 = `-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v2.5.4
Comment: http://openpgpjs.org

wy4ECQMI2R1X/4vNbPpgGpx+1K8GKfPJeM1k/bo4j/5dJxUPXvsG0Iovo69q
GCCO0kgBQTMP8cHkcFK2HQeEkbdl4Wk7WWPx6ZcxGQarUUiniIO5LOVJZsEI
Eq7oOAkcHTmkcETZ/ljglsrbPjSODs+zMgb2nfih3/E=
=jL+P
-----END PGP MESSAGE-----
`
*/
/*
let messageForJohn2 = `-----BEGIN PGP MESSAGE-----
Version: BCPG C# v1.6.1.0

hQEMA3VmEgBDxjDTAQf9HtpxlPW4zN+tE1XtAOPyWvgLOsErURbz5CaDtcDkZwKg
mhHnnnfanb4UX33FK6iD3kSAEoO1S0sYJeGUDohuHZIq89fm2H4wP7Lc/3kWTMXj
9/+Rid+/sHPgwAE4tRGHyirrZf+E3UnKoT2Xe2BKwKQGxVF20dsnHV6hsk9GO21V
COTKMqadYEVSjkDTYfyt3r3RKMvqXPj910cVXZga/x1CD3+vb1AoyioBBEl+H4uq
Z7M/9GYfG8tdOwT8i0VaZLYrsmuaErP84FiniWs6RZlOo/H8+6TYa24AInPIA5Nj
Tim229azdukFE74wMPhAJYQ+GfLYby0gdpumVcvz5Mksv5ZB9MD+9oEmyy23uF45
Jorn4zgVe0IJ+51shH+fLScHtKqpqUwlUIkaNMc=
=2pqj
-----END PGP MESSAGE-----
`
		
		//if (privateKey.decrypt("abc123")) {
			return openpgp.decrypt({
            			//privateKey: privateKey,
            			message: openpgp.message.readArmored(messageForJohn2),
						"password": "abbacab"
            		}); 
		//} 
		return Promise.reject('Wrong passphrase');
	})
	.then((decryptedData) => {
		// If all goes well we can now read the contents of Jonh's message :)
		final.innerHTML = "Decrypted message : \r\n\r\n" + decryptedData.data;
		console.log(JSON.parse(decryptedData.data));
	})
	.catch((err)=>{
		// In case something goes wrong
		console.error(err);
	})

*/
