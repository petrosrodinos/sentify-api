nest g resource users --no-spec

/auth/register/email
/auth/login/email

/auth/request/email
/auth/verify/email

/auth/oauth/google

npx prisma migrate dev --name init
npx prisma migrate reset

Get-ChildItem -Recurse -Directory -Name | Where-Object { $\_ -notmatch 'node_modules|dist' }
