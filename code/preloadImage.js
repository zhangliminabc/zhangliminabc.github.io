function proloadImage(images) {
    const preloadImage = []
    if (images.length <= 0) return preloadImage

    for (let i = 0; i < images.length; i++) {
        const imageItem = new Image()
        imageItem.src = images[i]
        if (imageItem.complete) {
            preloadImage.push(imageItem)
        } else {
            imageItem.onload = () => {
                proloadImage.push(imageItem)
            }
        }
    }
}