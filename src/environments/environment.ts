// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  clientId: '471876646140-435i8rjjncp3fujglp6n039cbl6vfse7.apps.googleusercontent.com',
  clientSecret: 'fMBxeRxwJArCb8gmmxCoO-NR',
  scope: [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.settings.basic'
  ],
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
  oAuthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  apiUrl: 'https://www.googleapis.com/gmail/v1',
  pageSize: 50
};
