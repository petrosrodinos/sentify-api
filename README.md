nest g resource users --no-spec

/auth/email/register
/auth/email/login

/auth/email/request
/auth/email/verify

/auth/x/login/url
/auth/x/login/callback

npx prisma migrate dev --name init
npx prisma generate
npx prisma migrate reset

Get-ChildItem -Recurse -Directory -Name | Where-Object { $\_ -notmatch 'node_modules|dist' }
