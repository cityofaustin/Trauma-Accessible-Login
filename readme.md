# Trauma Accessible Login

When people experience trauma, many of the online services they depended on become inaccessible. Mental and physical stress can make holding onto physical devices hard, maintaining social relationships difficult, and remembering passwords and security questions next to impossible. Furthermore, people experience and adapt to stress differently making it impractical to find a single authentication method that is accessible for everyone. The Trauma Accessible Login was designed in recognition that the login methods that work for some people may not work for all. Also, this attempts to meet people’s capabilities and comfort where they are that day, which is perhaps, not where they were when they initially signed up for the service.

The Trauma Accessible Login solution has 2 components

#### 1. A login page that presents multiple options for sign-in.

<kbd><img src="/docs/loginbubble.png" align="middle" width="800" ></kbd>

#### 2. An onboarding workflow that helps users think through what methods of login will be most accessible to them.

<kbd><img src="/docs/onboarding.png" align="middle" width="800" ></kbd>

The intent of this login solution is that it be scalable to include as many login methods as can be helpful. For our initial POC we included 5 separate methods:

1. Password
2. Biometrics (palm print scan)
3. Security Questions
4. Two Factor Authentication
5. Social Attestation

## Oauth2.0

Because trauma accessible login features are needed for nearly all online services we implemented our multimodal as an Oauth2.0 server. This way any online service that already supports Oauth, can add an optional trauma accessible login without making large changes to their existing service. If you would like to add this service to your site, simply fork the repo and change the backing services from the mypass-backend to your own.

## Improved Biometrics Model

Part of being accessible to those experiencing trauma includes being sensitive to the fear that they may assign to specific methods of authentication. This is particularly true for any biometrics authentication. For the trauma accessible login, we addressed this fear through what we believe to be an improved biometrics model. We believe that if a user chooses to include biometrics as part of their sign-in process, that it should be private and secure by design. To ensure this, we have created a workflow that invites a user to put their device in airplane mode while completing biometric scans, such as facial recognition or fingerprint recognition. This ensures that all processing of sensitive biometric information is performed offline, and only once this information is converted to a safe form such as an abstracted template is the device reconnected to the internet.

<kbd><img src="/docs/Improvedbio.png" align="middle" width="800" ></kbd>

Important to note that the biometrics model included in this module is a UI framework.  In order to perform function biometric authentication, a third party recognition API needs to be included.  While we are not in the position to make an endorsement of a private utility we have put together an implementation guide for making biometrics secure and private by design.

[Ethical Implimentation of Biomentrics](https://github.com/cityofaustin/Trauma-Accessible-Login/wiki/EthicalBiometrics)

## Design considerations.

The trauma accessible login service authenticates a user then provides an authorization code to the application server and provides stewardship of a user’s private keys which are shared with the browser on their device at login. This is a service that is unique to applications which must be secure through end to end encryption but serves a userbase that is unable to hold onto an encryption key themselves. It is because of this use case we have made the multimodal service as a stand-alone Oauth server capable of being hosted by a disinterested 3rd party or through ownerless governance.

Our data model has been specifically constructed such that the Oauth server contains no Personally Identifiable Information (PII) but prompts the application backing services to complete any operation needing PII. An example of this is two-factor authentication, where a one-time-code is generated by the Oauth server then sent to the application service to be paired with the user’s phone number or email address before being sent to the user to complete the authentication process. By removing all PII from the authentication service we believe that this becomes a better candidate for disinterested 3rd party hosting.

## Getting Started

The Trauma Accessible Login was designed to be installed in concert with the MyPass secure document solution. But if you would like to install this as a stand-alone project here are the following steps you will need:

    npm start
    git clone https://github.com/cityofaustin/multimodal-login
    cd dist
    cp ../.env ./
    cp ../package.json ./
    npm install --production
    npm run build

This endpoint runs at http://localhost:3000

## One Click Heroku Deployment

Alternatively you can deploy to heroku with one click:

[![Image of Heroku One Click Deploy](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy/?template=https://github.com/cityofaustin/Trauma-Accessible-Login/tree/main)

### dev notes

to run the app in development mode I usually do a combination of `npm run dev` and `npm run webpack:watch` that way it transpiles the server code and the client code, you might be able to just do `npm run dev` but sometimes it seems like it doesn't load some client code sometimes. `npm start` also works but it doesn't do server live reload like `npm run dev` does.
