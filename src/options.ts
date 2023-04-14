export interface MediaMetadataImage {
	e: 'Image';
	m: 'image/png' | 'image/jpg';
	s: AlbumEntry;
	t?: string;
	id: string;
}

export interface MediaMetadataGif {
	e: 'AnimatedImage';
	m: 'image/gif';
	ext?: string;
	s: {
		y: number;
		gif: string;
		mp4?: string;
		x: number;
	};
	t?: string;
	id: string;
}

export interface AlbumEntry {
	y: number;
	x: number;
	u: string;
}

export interface Options {
	addTargetBlank?: boolean;
	media_metadata?: {
		[media_id: string]: MediaMetadataImage | MediaMetadataGif | undefined;
	};
}
