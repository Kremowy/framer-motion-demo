import ISearchDTO from '@/core/configuration/http/dto/Search.dto';
import TSearch from '../../domain/models/Search.model';

const searchMapper = (DTO: ISearchDTO): TSearch => {
  const SONGS = DTO.response.hits.map(({ result }) => ({
    id: result.id,
    api_path: result.api_path,
    name: result.full_title,
    image_thumbnail: result.header_image_thumbnail_url
  }));

  const UNORDERED_ARTISTS = DTO.response.hits.map(({ result }) => {
    const { primary_artist } = result;

    return {
      id: primary_artist.id,
      api_path: primary_artist.api_path,
      name: primary_artist.name,
      image_thumbnail: primary_artist.header_image_url
    };
  });

  const IDS = UNORDERED_ARTISTS.map(({ id }) => id);
  const ARTISTS = UNORDERED_ARTISTS.filter(({ id }, index) => !IDS.includes(id, index + 1));

  return {
    meta: DTO.meta,
    searched_data: {
      songs: SONGS,
      artists: ARTISTS
    }
  };
};

export default searchMapper;