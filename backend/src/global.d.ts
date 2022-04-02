declare namespace Express {
	namespace Multer {
		interface File {
			location: {
				original: string;
				medium: string;
				thumbnail: string;
			};
		}
	}
}
