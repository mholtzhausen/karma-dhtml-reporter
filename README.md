# karma-hipchat-reporter
Error and summary report from karma testing to hipchat

## Install

    npm install karma-hipchat-message

## Use
    module.exports = function (config) {
        config.set({

              ...

            hipchatReporter: {
                'auth_token' : '<auth_token>',
                'room_id'    : '<room_id>',
                'from'       : 'Karma Hipchat',
                'format'     : 'html',
                'color'      : 'yellow',
                'notify'     : 0,
                'title'      : null,
                'showbrowser': false
            },

            reporters: ['hipchat'],

            plugins: [

                   ...

                'karma-hipchat-reporter'
            ]
        })
    }



## Config Options
### auth_token [required]
Hipchat Authentication Token

### room_id [required]
The name or id of the room where you want to display your message

### from [required]
Max 15 character from-field text

### title
Optional Title to be displayed before the rest of the message

### format [required]
Should be `html`

### color { yellow, green, purple, red, gray }
The message color

### notify { 0, 1 }
**0** will indicate a background message  
**1** will indicate a notification is required

### showbrowser


