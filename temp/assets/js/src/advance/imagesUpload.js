/**
 * Convert a `File` object returned by the upload input into
 * a base 64 string. That's easier to use on FakeRest, used on
 * the ng-admin example. But that's probably not the most optimized
 * way to do in a production database.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadCapabilities = requestHandler => (type, resource, params) => {
    if ((type === 'UPDATE' && resource === 'users') || (type === 'CREATE' && resource === 'users')) {

        if (params.data.photo && params.data.photo.length) {
/*
            only freshly dropped photo are instance of File
*/
            const formerPhoto = params.data.photo.filter(p => !(p instanceof File));

            const newPhoto = params.data.photo.filter(p => p instanceof File);
            return Promise.all(newPhoto.map(convertFileToBase64))
                .then(base64Photo => base64Photo.map(picture64 =>  {
                    console.log(picture64);
                    return {
                        src: picture64,
                        title: `${params.data.title}`,
                    }
                }))
                .then(transformedNewPhoto => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        photo: [...transformedNewPhoto, ...formerPhoto],
                    },
                }));
        }
    }

    return requestHandler(type, resource, params);
};

export default addUploadCapabilities;