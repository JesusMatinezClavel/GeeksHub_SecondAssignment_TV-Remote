/////////////////////////////////////////////////////////////////////// DECLARACIONES

const ahora = new Date()

const fecha = ahora.toLocaleDateString()
const hora = ahora.toLocaleTimeString()

const screen = document.getElementById("tvScreen")
const chButtons = document.getElementsByClassName("chButton")
const screenBackG = document.getElementById("tvScreenBackG")
const channelMenu = document.getElementsByClassName("channelMenu")
const infoBackG = document.getElementById("infoBackG")
const volumeBar = document.getElementById("volumeBar")
const channelName = document.getElementById("channelName")
const addRemoveButtons = document.getElementsByClassName("addRemoveButton")
const crossButtons = document.getElementsByClassName("crossSelector")
const date = document.getElementById("date")
const time = document.getElementById("time")

const ioRemote = document.getElementById("ioRemoteButton")
const menuRemote = document.getElementById("menuButton")
const infoRemote = document.getElementById("infoButton")

const channel1 = document.getElementById("channel1")
const channel2 = document.getElementById("channel2")
const channel3 = document.getElementById("channel3")
const channel4 = document.getElementById("channel4")
const channel5 = document.getElementById("channel5")
const channel6 = document.getElementById("channel6")
const channel7 = document.getElementById("channel7")
const channel8 = document.getElementById("channel8")
const channel9 = document.getElementById("channel9")
const channel0 = document.getElementById("channel0")

let channelList = [channel1, channel2, channel3, channel4, channel5, channel6, channel7, channel8, channel9, channel0]
let channelNameList = ["Netflix", "Amazon", "HBO", "Disney+", "AppleTV", "Deportes", "Noticias", "Cine", "Series", "Música"]

let topButtonsList = [ioRemote, menuRemote, infoRemote]

let buttonsList = Array.from(chButtons)

let channelMenuList = Array.from(channelMenu)

let addRemoveButtonList = Array.from(addRemoveButtons)

let crossList = Array.from(crossButtons)

let IO = document.getElementById("ioButton")

let originalState = screen.classList.value
let originalChannelState = channelList.map(channel => channel.className.value)

let on

let buttonIndexLast = -1

let selectedChannel = -1

let buttonIndex

let firstChannelSelected = -1

/////////////////////////////////////////////////////////////////////// FUNCIONES

// FUNCION PARA ENCENDER Y APAGAR LA TV
function screenOnOff() {
    screen.classList.toggle("off")
}

// FUNCION PARA CAMBIAR EL ESTADO DE ON
function update() {
    !screen.classList.contains("off")
        ? on = true
        : on = false
}

// hora y tal

function dateTime() {
    date.innerHTML = fecha
    time.innerHTML = hora
}


function menuClick() {
    screenBackG.classList.toggle("index3")
    if (firstChannelSelected !== -1) {
        channelMenuList[firstChannelSelected].classList.add("channelMenuLookAt")
    } else {
        channelMenuList[selectedChannel].classList.add("channelMenuLookAt")
        firstChannelSelected = selectedChannel
    }
}

function infoClick() {
    infoBackG.classList.add("index4")
    volumeBar.classList.add("index4")
    setTimeout(() => {
        volumeBar.classList.remove("index4")
        infoBackG.classList.remove("index4")
    }, 2000)
}

function nameClick() {
    infoBackG.classList.add("index4")
    setTimeout(() => {
        infoBackG.classList.remove("index4")
    }, 1000)
}

// FUNCION PARA DARLE EVENTOS A LOS BOTONES SUPERIORES (I/O, MENU E INFO)
function buttonClickTop(e) {
    const buttonIndexTop = topButtonsList.indexOf(e.target)
    switch (buttonIndexTop) {
        case 0:
            screenOnOff()
            break;
        case 1:
            menuClick()
            console.log(selectedChannel)
            console.log(firstChannelSelected)
            break;
        case 2:
            infoClick()
            break;
    }
}

function volumeAdd() {
    var createVolume = document.createElement("div")
    volumeBar.classList.add("index4")
    setTimeout(() => {
        volumeBar.classList.remove("index4")
    }, 100)
    createVolume.className = "volume"
    if (volumeBar.classList.length <= 49)
        volumeBar.appendChild(createVolume)
}

function volumeRemove() {
    var deleteVolume = volumeBar.querySelector(".volume");
    volumeBar.classList.add("index4")
    setTimeout(() => {
        volumeBar.classList.remove("index4")
    }, 100)
    if (deleteVolume) {
        volumeBar.removeChild(deleteVolume);
    }
}

function channelAdd() {
    if (firstChannelSelected !== -1) {
        selectedChannel = firstChannelSelected
        firstChannelSelected = -1
    }
    channelList[selectedChannel].classList.remove("index2")
    channelList[selectedChannel + 1].classList.add("index2")
    channelName.textContent = channelNameList[selectedChannel + 1]
    selectedChannel = selectedChannel + 1
    nameClick()
}


function channelRemove() {
    if (firstChannelSelected !== -1) {
        selectedChannel = firstChannelSelected
        firstChannelSelected = -1
    }
    channelList[selectedChannel].classList.remove("index2")
    channelList[selectedChannel - 1].classList.add("index2")
    channelName.textContent = channelNameList[selectedChannel - 1]
    selectedChannel = selectedChannel - 1
    nameClick()
}



function buttonClickChannelVol(e) {
    const buttonAddRemove = addRemoveButtonList.indexOf(e.target)
    switch (buttonAddRemove) {
        case 0: volumeAdd()
            break;
        case 1: volumeRemove()
            break;
        case 2: channelAdd()
            break;
        case 3: channelRemove()
            break;
    }
}


function arrowUp() {
    if (firstChannelSelected >= 5 && firstChannelSelected <= 9) {
        channelMenuList[firstChannelSelected - 5].classList.add("channelMenuLookAt")
        firstChannelSelected = firstChannelSelected - 5
    } else {
        channelMenuList[firstChannelSelected].classList.add("channelMenuLookAt")
    }
}

function arrowLeft() {
    if (firstChannelSelected === 0) {
        firstChannelSelected = 10;
    }
    channelMenuList[firstChannelSelected - 1].classList.add("channelMenuLookAt");
    firstChannelSelected = firstChannelSelected - 1;
}

function centralCross() {
    channelMenuList[firstChannelSelected].classList.remove("channelMenuLookAt")
    channelList[firstChannelSelected].classList.add("index2")
    screenBackG.classList.remove("index3")
    selectedChannel = firstChannelSelected
}

function arrowRight() {
    if (firstChannelSelected === 9) {
        firstChannelSelected = -1;
    }
    channelMenuList[firstChannelSelected + 1].classList.add("channelMenuLookAt");
    firstChannelSelected = firstChannelSelected + 1;
}

function arrowDown() {
    if (firstChannelSelected >= 0 && firstChannelSelected <= 4) {
        channelMenuList[firstChannelSelected + 5].classList.add("channelMenuLookAt");
        firstChannelSelected = firstChannelSelected + 5;
    } else {
        channelMenuList[firstChannelSelected].classList.add("channelMenuLookAt")
    }
}


function crossClick(e) {
    const crossIndex = crossList.indexOf(e.target)
    if (firstChannelSelected !== -1) {
        channelMenuList[firstChannelSelected].classList.remove("channelMenuLookAt")
    }
    switch (crossIndex) {
        case 0: arrowUp()
            break;
        case 1: arrowLeft()
            break;
        case 2: centralCross()
            break;
        case 3: arrowRight()
            break;
        case 4: arrowDown()
            break;
    }
}

// FUNCION PARA AÑADIR Y QUITAR A LOS CANALES DE LA CLASE INDEX2 (z-index: 2)
function buttonClick(e) {
    if (firstChannelSelected !== -1) {
        firstChannelSelected = selectedChannel
    }
    const buttonIndex = buttonsList.indexOf(e.target)
    screenBackG.classList.remove("index1")
    screenBackG.classList.remove("index3")
    if (buttonIndexLast !== -1) {
        channelList[buttonIndexLast].classList.remove("index2")
    }
    channelName.textContent = channelNameList[buttonIndex]
    nameClick()
    channelList[buttonIndex].classList.add("index2")
    buttonIndexLast = buttonIndex
    selectedChannel = channelList.indexOf(channelList[buttonIndex])
}


function addcrossClick() {
    crossList.map(
        (item, index) => {
            item.addEventListener("click", crossClick)
        }
    )
}

function removecrossClick() {
    crossList.map(
        (item, index) => {
            item.removeEventListener("click", crossClick)
        }
    )
}
function togglecrossButtonClick() {
    if (on == true) {
        addcrossClick()
    } else {
        screen.className = originalState
        channelList[buttonIndexLast].classList = originalChannelState
        removecrossClick()
    }
}


function addChanVolClick() {
    addRemoveButtonList.map(
        (item, index) => {
            item.addEventListener("click", buttonClickChannelVol)
        }
    )
}

function removeChanVolClick() {
    addRemoveButtonList.map(
        (item, index) => {
            item.removeEventListener("click", buttonClickChannelVol)
        }
    )
}
function toggleChanVolButtonClick() {
    if (on == true) {
        addChanVolClick()
    } else {
        screen.className = originalState
        channelList[buttonIndexLast].classList = originalChannelState
        removeChanVolClick()
    }
}


function addTopButtonClick() {
    topButtonsList.map(
        (item, index) => {
            item.addEventListener("click", buttonClickTop)
        }
    )
}

function removeTopButtonClick() {
    topButtonsList.map(
        (item, index) => {
            item.removeEventListener("click", buttonClickTop)
        }
    )
}
function toggleTopButtonClick() {
    if (on == true) {
        addTopButtonClick()
    } else {
        screen.className = originalState
        channelList[buttonIndexLast].classList = originalChannelState
        removeTopButtonClick()
    }
}

// FUNCION PARA AÑADIR EL BOTON A LOS CANALES
function addButtonClick() {
    buttonsList.map(
        (item, index) => {
            item.addEventListener("click", buttonClick)
        }
    )
}

// FUNCION PARA QUITAR EL BOTON DE LOS CANALES
function removeButtonClick() {
    buttonsList.map(
        (item, index) => {
            item.removeEventListener("click", buttonClick)
        }
    )
}

// FUNCION PARA CONVERTIR LAS ANTERIORES FUNCIONES EN UNA SOLA
function toggleChannelClick() {
    if (on == true) {
        addButtonClick()
    } else {
        screen.className = originalState
        if (buttonIndexLast !== -1 && buttonIndexLast < channelList.length) {
            channelList[buttonIndexLast].className = originalChannelState[buttonIndexLast]
        }
        removeButtonClick()
    }
}


function originalTv() {
    if (!on) {
        firstChannelSelected = -1
        selectedChannel = -1
        channelList.forEach(channel => channel.classList.remove("index2"))
        channel0.classList.remove("index2");
        screenBackG.classList.add("index1")
    }
}

/////////////////////////////////////////////////////////////////////// EVENTOS


///////////// EVENTO PARA ENCENDER LA TV Y POSIBILITAR EL RESTO DE FUNCIONES

IO.addEventListener("click", (e) => {
    screenOnOff()
    update()
    dateTime()
    toggleChannelClick()
    toggleTopButtonClick()
    toggleChanVolButtonClick()
    togglecrossButtonClick()
    originalTv()
})
