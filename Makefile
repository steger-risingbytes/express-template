build:
	@npm run build

start:
	@$(MAKE) build
	@node ./build/indej.js

client-generate:
	@npx prisma generate
