# express-template

Diese Template erleichtert es, monolithische Web-Server in NodeJs zu erstellen. Zu den bereits installierten Modulen gehört:
- TypeScript
- express
- express-validator
- jwonwebtoken
- prisma

## Dateistruktur
Die Dateistruktur ist der von Ruby on Rails sehr ähnlich. 

Alle Webserver bezogenen Files befinden sich im ```src``` Ordner. Darunter fällt der express-server selbst ```src/server/server.ts``` sowie Konfigurationen ```src/config/*```, Utility Funktionen ```src/util``` und die Controller und Validatoren ```src/app/*```.

### Controller
Controller sind eine generelle Zusammenfassung von verschiedenen Endpunkten einer Domäne (z.B. Auth). Ein Controller sieht dabei folgenermaßen aus (z.B. auth_controller.ts):
```ts
import { Router } from "express"
import { RouteHelper } from "../../util/RouteHelper"
const router = Router()

router.get("/login", RouteHelper({ private: false }, (req, res) => {
    res.send("test")
}))

route.post("/test", RouteHelper({ private: true, roles: ["admin"] }, (req, res) => {
    // ...
}))

export const auth_controller = router

```

Diese Controller werden unter ihrem Namen exportiert ```export const *_controller = router```.
Um die einzelnen Routen auch zu initialisieren, muss ein Controller im ```src/config/routes_config.ts``` File registriert werden. Dieses File exportiert ein Array mit allen zu registrierenden Routen, die vom Server übernommen werden.
```ts
import { Router } from "express";
import { auth_controller } from "../app/controllers/auth_controller";

type IRoutesConfig = {
    path: string
    controller: Router
}[]

export const ROUTES_CONFIG: IRoutesConfig = [
    {
        path: "/auth",
        controller: auth_controller
    }
]
```

## Validator
Validatoren validieren einen Request und prüfen, ob er alle notwendigen parameter als ```body```, ```param```, oder ```query``` enthält. Ein Validator ist so aufgebaut, dass er aus einem Middleware-Array besteht.
```ts
import { body, query, param } from "express-validator"

export const auth_validators = {

    login: [
        body("email").isString().isEmail(),
        body("password").isString()
    ]

}
```

Eine Middleware muss vor dem Request in einen Express-Handler gegeben werden:
```ts
route.post("/login", auth_validators.login, RouteHelper({ private: false }, (req, res => {

})))
```

## RouteHelper
Der RouteHelper übernimmt einige Funktionen, wie das validieren der zuvor hinzugefügten Validator-Middleware und dem Authorisieren von Requests mittels JWT-Token. Durch die verpflichtende Angabe des Options-Objektes
```ts
interface IRequestOptions {
    private: boolean
    roles?: string[]
}
```
kann der Router feststellen, ob es sich um eine private oder öffentlich zugängliche Route handelt. Das Roles-Array sagt dabei aus, welche Rollen der Benutzer haben muss, um Requests auf diesem Pfad durchzuführen.
```ts
router.get("/test", RouteHelper({ private: false, roles: ["admin"]}, (req, res) => {
    // ...
}))
```

## JwtHelper
Das JwtHelper File inkludiert die Funktionen ```SignToken``` und ```VerifyToken```, die einen Token erstellen und verifizieren können. Das Schema eines Tokens ist in der Datei ```src/config/jwt_config.ts``` definiert.


## Datenbank
Die Datenbank verwendet den ORM [prisma](http://prisma.io/). Das Datenschema wird in das File ```prisma/schema.prisma``` geschrieben. Durch das Command ```npx prisma generate``` wird der [Prisma-Client als node_module erstellt](https://www.prisma.io/docs/concepts/components/prisma-client#3-use-prisma-client-to-send-queries-to-your-database).

Bei jeder Änderung des Schemas muss der Client neu generiert werden.

Migrations können über den Command ```npx migrate dev --name [MIGRATION NAME]``` durchgeführt werden. siehe: https://www.prisma.io/docs/concepts/components/prisma-client#3-use-prisma-client-to-send-queries-to-your-database
 


