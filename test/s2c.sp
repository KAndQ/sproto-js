.package {
    type 0 : integer
    session 1 : integer
}

.Player {
    hp 0 : integer
    mp 1 : integer
    name 2 : string
    race 3 : string
    level 4 : integer
    exp 5 : integer
}

startMovePlayer 1 {
    request {
        direction 0 : integer
        playerId 1 : integer
    }
}

endMovePlayer 2 {
    request {
        playerId 0 : integer
    }
}

startPlayerFire 3 {
    request {
        playerId 0 : integer
        weaponId 1 : integer
    }
}

endPlayerFire 4 {
    request {
        playerId 0 : integer
        weaponId 1 : integer
    }
}

showPlayer 5 {
    request {
        player 0 : Player
    }
}


