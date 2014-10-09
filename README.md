# Music Store App

This is a Cordova project for Android and IOS platforms, build with [Ionic](http://ionicframework.com/).
The project demos the integration of the [BitPay's Cordova SDK](http://github.com/bitpay/cordova-sdk).

## Install dependencies

    sudo npm install -g cordova ionic
    git clone https://github.com/bitpay/sample-cordova-sdk.git
    npm install
    bower install

## Configure project

    cordova plugin add https://github.com/bitpay/cordova-sdk.git

    cordova plugin add com.ionic.keyboard
    cordova plugin add org.apache.cordova.console
    cordova plugin add org.apache.cordova.device

    cordova platform add ios
    cordova platform add android

## Setup your token
Create a new token on [My Account > API Tokens](https://test.bitpay.com/api-tokens) and use it to create a Bitpay instance. Edit BitPay's serivce initialization at [www/js/services.js](./www/js/services.js#L14) to use your token.

    var bitpay = new Bitpay({
        host: 'test.bitpay.com',
        port: 443,
        token: '<YOUR_TOKEN>'
    });

## Run it

    cordova emulate ios
    cordova run android
