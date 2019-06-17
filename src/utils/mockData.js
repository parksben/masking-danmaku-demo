import example from 'barrage-ui/example.json';

const randomKey = () =>
  new Array(2)
    .fill(0)
    .map(() =>
      Math.random()
        .toString(32)
        .slice(2)
    )
    .join('');

const colors = ['#f00', '#0f0', '#ff0', '#fff', '#fff', '#fff', '#fff'];
const randomColor = () => colors[Math.floor(6 * Math.random())];

const randomText = () =>
  example[Math.floor(example.length * Math.random())].text;

const avatarList = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  '/images/avatar-01.svg',
  '/images/avatar-02.svg',
  '/images/avatar-03.svg',
  '/images/avatar-04.svg',
  '/images/avatar-05.svg',
  '/images/avatar-06.svg',
];
const randomAvatar = () =>
  avatarList[Math.floor(avatarList.length * Math.random())];

const createdStart = Date.now();

const database = new Array(500).fill(null).map((d, i) => ({
  key: randomKey(),
  time: 500 * (i + Math.random()),
  avatar: randomAvatar(),
  text: randomText(),
  color: randomColor(),
  createdAt: createdStart + Math.random() * 24 * 3600 * 1000,
}));

export default database;
