
# mcbot-basic

## config

place the config in the file `.env`

- `SERVER`: IP of the server
- `BOT_USERNAME`: username of the bot
- `BOT_PASSWORD`: _(optional)_ password of the bot leave empty for cracked servers
- `RECONNECT_DELAY`: time the bot will wait (in seconds) before trying to reconnect in case of `kick` / `disconnect` / `error`
- `SERVER_PORT`: _(optional)_ port of the server
- `PORT`: _(optional)_ port of the browser viewer
- `MC_VERSION`: _(optional)_ version of the server
- `MOVE_DELAY_MAX`: _(optional)_ maximum time to wait before changing moves
- `MODE`: one of
  - `goto`: got to a random position between:
    - `GOTO_MAX_DISTANCE`
    - `GOTO_MIN_DISTANCE`
- `random`: do random moves

## example config

```ini
# .env
BOT_USERNAME      = toto
SERVER            = localhost
SERVER_PORT       = 50642
PORT              = 3001
RECONNECT_DELAY   = 10
MC_VERSION        = 1.16.5
MOVE_DELAY_MAX    = 5
MODE              = goto
GOTO_MAX_DISTANCE = 4000
GOTO_MIN_DISTANCE = 1000
```

## recommendations

for the bot to not get stuck in water drop him frost walking bots:

```minecraft
/give @s diamond_boots{Unbreakable:1b,Enchantments:[{id:"minecraft:feather_falling",lvl:5s},{id:"minecraft:frost_walker",lvl:2s}]} 1
```

You have to drop it, if you give it directly it won't equip.

