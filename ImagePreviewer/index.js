window.addEventListener('load', () => {
    const images = [{
            name: 'Cats',
            url: 'images/cats.jpg'
        },
        {
            name: 'Cow',
            url: 'images/cow.jpg'
        },
        {
            name: 'Еagle',
            url: 'images/eagle.jpg'
        },
        {
            name: 'Elephant',
            url: 'images/elephant.jpg'
        },
        {
            name: 'Hamster',
            url: 'images/hamster.jpg'
        },
        {
            name: 'Horse',
            url: 'images/horse.jpg'
        },
        {
            name: 'Lion',
            url: 'images/lion.jpg'
        },
        {
            name: 'Rabbits',
            url: 'images/rabbits.jpg'
        },
        {
            name: 'Rhinos',
            url: 'images/rhinos.jpg'
        },
        {
            name: 'Squirrel',
            url: 'images/squirrel.jpg'
        },
        {
            name: 'Tigers',
            url: 'images/tigers.jpg'
        }
    ];

    const previewImage = image => {
        const previewedImageDetailsContainerFragmentElement = document.createDocumentFragment();

        const previewedImageNameElement = document.createElement('h2');
        previewedImageNameElement.innerHTML = image.name;
        previewedImageNameElement.classList.add('previewed-image-name');

        const previewedImageElement = document.createElement('img');
        previewedImageElement.src = image.url;
        previewedImageElement.classList.add('previewed-image');

        previewedImageDetailsContainerFragmentElement.appendChild(previewedImageNameElement);
        previewedImageDetailsContainerFragmentElement.appendChild(previewedImageElement);

        const imagePreviewedElement = document.getElementsByClassName('image-details-previewed')[0];

        while (imagePreviewedElement.children.length > 0) {
            imagePreviewedElement.removeChild(imagePreviewedElement.children[0]);
        }

        imagePreviewedElement.appendChild(previewedImageDetailsContainerFragmentElement);
    };

    previewImage(images[0]);

    const imageContainerFragmentElement = document.createElement('ul');
    imageContainerFragmentElement.classList.add('image-container-inner');
    imageContainerFragmentElement.addEventListener('click', event => {

        const selectedImage = event.target.tagName === 'LI' ? event.target : event.target.parentElement;

        const selectedImageName = selectedImage.getElementsByClassName('image-name')[0].innerHTML;
        const selectedImageUrl = selectedImage.getElementsByClassName('image')[0].src;

        previewImage({ name: selectedImageName, url: selectedImageUrl });
    });

    const createImageDetailsElement = image => {
        const imageDetailsContainerElement = document.createElement('li');
        imageDetailsContainerElement.classList.add('image-details-container');

        const imageNameElement = document.createElement('span');
        imageNameElement.innerHTML = image.name;
        imageNameElement.classList.add('image-name');

        const imageElement = document.createElement('img');
        imageElement.src = image.url;
        imageElement.classList.add('image');

        imageDetailsContainerElement.appendChild(imageNameElement);
        imageDetailsContainerElement.appendChild(imageElement);

        return imageDetailsContainerElement;
    };

    images.forEach(image => imageContainerFragmentElement.appendChild(createImageDetailsElement(image)));

    const uploadedImages = JSON.parse(window.localStorage.getItem('uploaded-images'));
    if (uploadedImages) {
        uploadedImages.forEach(image => imageContainerFragmentElement.appendChild(createImageDetailsElement(image)));
    } else {
        window.localStorage.setItem('uploaded-images', JSON.stringify([]));
    }

    document
        .getElementsByClassName('image-container')[0]
        .appendChild(imageContainerFragmentElement);

    document.getElementsByClassName('image-search-input')[0].addEventListener('keyup', event => {

        const images = document.getElementsByClassName('image-container-inner')[0];
        Array.from(images.children).forEach(image => {
            const imageName = image.getElementsByClassName('image-name')[0];

            if (imageName.innerHTML.toLowerCase().includes(event.target.value.toLowerCase())) {
                image.classList.remove('hidden');
            } else {
                image.classList.add('hidden');
            }
        });
    });

    const toggleUpload = () => {
        document.getElementsByClassName('image-stored-container')[0].classList.toggle('hidden');
        document.getElementsByClassName('image-upload-container')[0].classList.toggle('hidden');
    };

    document.getElementsByClassName('show-image-upload-button')[0].addEventListener('click', toggleUpload);
    document.getElementsByClassName('back-button')[0].addEventListener('click', toggleUpload);
    document.getElementsByClassName('image-upload-button')[0].addEventListener('click', () => {

        const image = {};
        image.name = document.getElementById('image-upload-input-name').value;
        image.url = document.getElementById('image-upload-input-url').value;

        document.getElementById('image-upload-input-name').value = '';
        document.getElementById('image-upload-input-url').value = '';

        const uploadedImages = JSON.parse(window.localStorage.getItem('uploaded-images'));
        uploadedImages.push(image);
        window.localStorage.setItem('uploaded-images', JSON.stringify(uploadedImages));

        document
            .getElementsByClassName('image-container-inner')[0]
            .appendChild(createImageDetailsElement(image));

        previewImage(image);
        toggleUpload();
    });

    const enableUploadButton = () => {
        if (document.getElementById('image-upload-input-name').value.length > 0 &&
            document.getElementById('image-upload-input-url').value.length > 0) {
            document.getElementsByClassName('image-upload-button')[0].disabled = false;
        } else {
            document.getElementsByClassName('image-upload-button')[0].disabled = true;
        }
    }

    document.getElementById('image-upload-input-name').addEventListener('keyup', enableUploadButton);
    document.getElementById('image-upload-input-url').addEventListener('keyup', enableUploadButton);
});
