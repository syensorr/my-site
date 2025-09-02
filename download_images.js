/*
 * ИНСТРУКЦИЯ ПО ДОБАВЛЕНИЮ ИЗОБРАЖЕНИЙ:
 * 1. Добавьте ваши изображения в папку images/
 * 2. Используйте следующие имена файлов для соответствующих изображений:
 * 
 * 1. main-background.jpg - главный фон на главной странице (рекомендуемый размер: 1920x1080px)
 * 2. restaurant-interior.jpg - интерьер ресторана (страница "О нас")
 * 3. chef-1.jpg - фото первого повара (страница "О нас")
 * 4. chef-2.jpg - фото второго повара (страница "О нас")
 * 5. restaurant-manager.jpg - фото менеджера (страница "О нас")
 * 6. menu-appetizer-1.jpg - закуска 1 (страница "Меню")
 * 7. menu-appetizer-2.jpg - закуска 2 (страница "Меню")
 * 8. menu-main-1.jpg - основное блюдо 1 (страница "Меню")
 * 9. menu-main-2.jpg - основное блюдо 2 (страница "Меню")
 * 10. menu-dessert-1.jpg - десерт 1 (страница "Меню")
 * 11. menu-dessert-2.jpg - десерт 2 (страница "Меню")
 *
 * Примечание: 
 * - Поддерживаемые форматы: JPG, PNG, WebP
 * - Рекомендуемый размер для фотографий блюд: 800x600px
 * - Рекомендуемый размер для фотографий команды: 600x600px
 */

console.log('Пожалуйста, добавьте ваши изображения в папку images/ в соответствии с инструкцией выше.');
console.log('Этот файл больше не требуется для работы сайта и может быть удален.');

// Function to download an image
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(imagesDir, filename);
        const file = fs.createWriteStream(filePath);
        
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {}); // Delete the file if there's an error
            console.error(`Error downloading ${filename}:`, err.message);
            reject(err);
        });
    });
}

// Download all images
async function downloadAllImages() {
    console.log('Starting image downloads...');
    
    try {
        for (const image of images) {
            await downloadImage(image.url, image.filename);
        }
        console.log('All images downloaded successfully!');
    } catch (error) {
        console.error('Error downloading images:', error);
    }
}

// Run the download
if (require.main === module) {
    downloadAllImages();
}
