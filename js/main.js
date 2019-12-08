window.onload = function () {

    let file = document.getElementById("file"),
        audio = document.getElementById("audio"),
        field = document.getElementsByClassName('field')[0];


    file.onchange = function () {
        let files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        audio.load();
        audio.play();
        let context = new AudioContext(),
            src = context.createMediaElementSource(audio),
            analyser = context.createAnalyser(),
            numberOfPartsX = +prompt('Введите число одних клеточек'),
            numberOfPartsY = +prompt('Введите число других клеточек');

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 1024;

        let bufferLength = analyser.frequencyBinCount,
            dataArray = new Uint8Array(bufferLength);

        let newTable = document.createElement('table');

        newTable.className = 'table';

        for (let i = 0; i < numberOfPartsX; i++) {
            let newTr = document.createElement('tr');
            for (let j = 0; j < numberOfPartsY; j++) {
                let newTd = document.createElement('td');
                newTr.appendChild(newTd);
            }
            newTable.appendChild(newTr);
        }
        field.appendChild(newTable);

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            analyser.getByteFrequencyData(dataArray);

            let cells = document.getElementsByTagName('td');

            for (let i = 0; i < bufferLength; i++) {
                let color = dataArray[i],
                    r = color,
                    g = 120 * (i / bufferLength),
                    b = 50;

                setInterval(() => {
                    for (let i of cells) {
                        i.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    }
                }, 50);
            }
        }
        audio.play();
        renderFrame();
    };
};