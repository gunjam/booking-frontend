# Booking Frontend

### Step 1
The Booking frontend needs to connect to an instance of [the Booking API](https://github.com/gunjam/booking-api). You will need to install and run that first.

### Step 2
Fork the Booking Frontend repo, clone it to your machine and run npm install.
```
npm install
```

### Step 3
If you're testing locally and want access to all of the features, set the environment variables in the terminal or in your bash profile. These are all optional when testing, but should be set in production with the exception of IP_WHITE_LIST.

If you don't set an email and password the application wont be able to send verification emails.

If you don't set an IP whitelist the application will remain accessible to any IP address.

The timezone is set so that the application can handle changes in the clocks going forwards or backwards.

### Step 4
Start the application.
```
node server
```

## Environment Variables
`PORT` - defaults to 5000  
`IP_WHITE_LIST` - array of IP's as strings. If set, the application will reject connections from any IP not in the array.  
`EMAIL_ADDRESS` - an email address the application can use to send verification emails.  
`EMAIL_PASSWORD` - password to the EMAIL_ADDRESS so the application can log in to send verification emails.  
`TZ` - timezone  

examples:

```
IP_WHITE_LIST=['127.0.0.1', '192.168.0.1']
EMAIL_ADDRESS=room.bookings@gmail.com
EMAIL_PASSWORD=p45sW0rd!
TZ=Europe/London
```

