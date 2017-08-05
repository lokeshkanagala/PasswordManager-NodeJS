console.log('Starting Password Manager');

var storage = require('node-persist');
storage.initSync();

var argv = require('yargs').command('create', 'Create an account', function(yargs) {
	yargs.options({
		name: {
			demand: true,
			type: 'string',
			alias: 'n',
			description: 'Your account name goes here'
		},
		username: {
			type: 'string',
			demand: true,
            alias: 'u',
            description: 'Your account username goes here'
		},
		password: {
			demand: true,
			type: 'string',
			alias: 'p',
			description: 'Your password goes here',
		}
	}).help('help')
}).command('get', 'Get the details of aaccount', function(yargs) {
	yargs.options({
		name: {
			demand: true,
			type: 'string',
			alias: 'n',
			description: 'your account name goes here'
		}
	}).help('help')
}).help('help').argv; 

// account.name Facebook
// account.username User12!
// account.password Password123!

function createAccount (account) {
	var accounts = storage.getItemSync('accounts');

	if (typeof accounts === 'undefined') {
		accounts = [];
	}

	accounts.push(account);
	storage.setItemSync('accounts', accounts);

	return account;
}

function getAccount (accountName) {
	var accounts = storage.getItemSync('accounts');
	var matchedAccount;

	accounts.forEach(function (account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

  if(argv._[0] === 'create' && typeof argv.name !== 'undefined' && typeof argv.username !== 'undefined' && typeof argv.password !== 'undefined') {
      var account = createAccount({name: argv.name, username: argv.username, password: argv.password});
      console.log('Created account' + account.name );
  }else if (argv._[0] === 'get' && typeof argv.name !== 'undefined') {
  	var account = getAccount(argv.name);
  	if (typeof account !== 'undefined') {
  		console.log('Account Found');
  		console.log(account);
  	}else {
  		console.log('Account Not Found');
  	}
  }
      

 /*createAccount({
 	name: 'Facebook',
	username: 'someemail@gmail.com',
	password: 'Password123!'
 });*/

//var facebookAccount = getAccount('Facebook');
//console.log(facebookAccount);