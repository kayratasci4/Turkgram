import { Post, Story, User } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'benim_profilim',
  fullName: 'Can Yılmaz',
  avatarUrl: 'https://picsum.photos/id/1005/150/150',
};

export const MOCK_STORIES: Story[] = [
  {
    id: 's1',
    user: { id: 'u1', username: 'ayse_yilmaz', fullName: 'Ayşe Yılmaz', avatarUrl: 'https://picsum.photos/id/1011/150/150' },
    isSeen: false,
  },
  {
    id: 's2',
    user: { id: 'u2', username: 'mehmet.demir', fullName: 'Mehmet Demir', avatarUrl: 'https://picsum.photos/id/1012/150/150' },
    isSeen: false,
  },
  {
    id: 's3',
    user: { id: 'u3', username: 'zeynep_k', fullName: 'Zeynep Kaya', avatarUrl: 'https://picsum.photos/id/1027/150/150' },
    isSeen: true,
  },
  {
    id: 's4',
    user: { id: 'u4', username: 'burak_official', fullName: 'Burak Öz', avatarUrl: 'https://picsum.photos/id/1003/150/150', isVerified: true },
    isSeen: false,
  },
  {
    id: 's5',
    user: { id: 'u5', username: 'gegin_kiz', fullName: 'Elif Su', avatarUrl: 'https://picsum.photos/id/1014/150/150' },
    isSeen: false,
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    user: {
      id: 'u1',
      username: 'ayse_yilmaz',
      fullName: 'Ayşe Yılmaz',
      avatarUrl: 'https://picsum.photos/id/1011/150/150',
      isVerified: true
    },
    imageUrl: 'https://picsum.photos/id/1015/800/800',
    caption: 'İstanbul boğazında harika bir gün batımı! 🌅 #istanbul #manzara #huzur',
    likes: 1243,
    comments: [
      { id: 'c1', username: 'mehmet.demir', text: 'Mükemmel kare! 🔥', timestamp: '2d' },
      { id: 'c2', username: 'zeynep_k', text: 'Çok güzel çıkmışsın canım ❤️', timestamp: '1d' }
    ],
    timestamp: '2 saat önce',
    location: 'Ortaköy, İstanbul',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'p2',
    user: {
      id: 'u4',
      username: 'burak_official',
      fullName: 'Burak Öz',
      avatarUrl: 'https://picsum.photos/id/1003/150/150',
      isVerified: true
    },
    imageUrl: 'https://picsum.photos/id/1074/800/800',
    caption: 'Pazar kahvaltısı gibisi yok 🍳🥞 Herkese iyi pazarlar!',
    likes: 856,
    comments: [
      { id: 'c3', username: 'canan_t', text: 'Afiyet olsun!', timestamp: '5s' }
    ],
    timestamp: '5 saat önce',
    location: 'Kadıköy Moda',
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'p3',
    user: {
      id: 'u6',
      username: 'dogasever',
      fullName: 'Doğa Sever',
      avatarUrl: 'https://picsum.photos/id/1025/150/150'
    },
    imageUrl: 'https://picsum.photos/id/1036/800/800',
    caption: 'Karadeniz turumuzdan kalanlar. Yeşilin her tonu burada. 🌲🌿 #karadeniz #yayla #doğa',
    likes: 2341,
    comments: [],
    timestamp: '1 gün önce',
    location: 'Rize, Ayder Yaylası',
    isLiked: false,
    isSaved: false,
  }
];