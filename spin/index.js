const spinButton = document.getElementById('spin-button');

spinButton.addEventListener('click', () => {
    spinButton.disabled = true;

    const randomDegree = Math.floor(Math.random() * 360) + 720;
    wheel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        wheel.style.transition = 'none';

        // Choose a random piece (1-4) to move
        const winningPiece = Math.floor(Math.random() * 4) + 1;

        // Reset all pieces to their starting positions before moving one
        // (You would need to define these initial positions in your CSS)
        // For example:
        // chestPiece1.style.top = '...';
        // chestPiece2.style.top = '...';
        // etc.

        // Based on the random result, move the correct piece to its seat
        switch(winningPiece) {
            case 1:
                chestPiece1.style.top = seat1.offsetTop + 'px';
                chestPiece1.style.left = seat1.offsetLeft + 'px';
                break;
            case 2:
                chestPiece2.style.top = seat2.offsetTop + 'px';
                chestPiece2.style.left = seat2.offsetLeft + 'px';
                break;
            case 3:
                legPiece1.style.top = seat3.offsetTop + 'px';
                legPiece1.style.left = seat3.offsetLeft + 'px';
                break;
            case 4:
                legPiece2.style.top = seat4.offsetTop + 'px';
                legPiece2.style.left = seat4.offsetLeft + 'px';
                break;
        }

        spinButton.disabled = false;
    }, 3000);
});