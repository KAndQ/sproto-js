.package {
    type 0 : integer
    session 1 : integer
}

.User {
    nickName 0 : string
    sex 1 : integer
}

auth 1 {
    request {
        code 0 : string
        platform 1 : integer
    }

    response {
        result 0 : integer
        user 1 : User
    }
}

startMove 2 {
    request {
        direction 0 : integer
    }

    response {
        result 0 : integer
    }
}

endMove 3 {
    request {
    }

    response {
        result 0 : integer
    }
}

startFire 4 {
    request {
    }

    response {
        result 0 : integer
    }
}

endFire 5 {
    request {
    }

    response {
        result 0 : integer
    }
}


