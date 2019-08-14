Fork of [https://github.com/vsternbach/angular-ts-decorators](https://github.com/vsternbach/angular-ts-decorators)

- added simple support for controllers @Controller (not Angular2 valid)
- npm scripts ported to windows (for in loops)
- id in module is required
- added registrations to ST module system
- added ensure of $inject static property
- directive class represents directive body instead of controller in order to be able to inject services into compile and link functions

# New version release
- npm version patch -m "chore(version): increase to 4.0.3"
- npm login (steinringer credentials - confluence)
- npm run build
- npm publish dist --access public