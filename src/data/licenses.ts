export interface LicenseItem {
  id: string;
  name: string;
  link?: string;
  // Use sub_items to nest related certifications or modules under this item.
  // Useful for tracks or specializations that have multiple parts.
  sub_items?: LicenseItem[];
}

export interface License {
  id: string;
  issuer: string;
  items: LicenseItem[];
}

export const licenses: License[] = [
  {
    id: "1",
    issuer: "Codepolitan",
    items: [
      {
        id: "1",
        name: "Introduction to Programming",
        sub_items: [
          {
            id: "1-1",
            name: "Introduction to Computer Programming",
            link: "https://codepolitan.com/c/DT5UOY8",
          },
          {
            id: "1-2",
            name: "Algorithms and Basic Programming",
            link: "https://codepolitan.com/c/NIHDABO",
          },
          {
            id: "1-3",
            name: "Proficient in Using a Text Editor for Beginners",
            link: "https://codepolitan.com/c/SXCIH8O",
          },
          {
            id: "1-4",
            name: "Learning to Use the Terminal (CMD) for Development",
            link: "https://codepolitan.com/c/XP9YVEK",
          },
          {
            id: "1-5",
            name: "Git Basics for Beginners",
            link: "https://codepolitan.com/c/5GM8RL1",
          },
          {
            id: "1-6",
            name: "Learn Advanced GIT",
            link: "https://codepolitan.com/c/TUVMYOP",
          },
        ]
      },
      {
        id: "2",
        name: "UI/UX",
        sub_items: [
          {
            id: "2-1",
            name: "Building a Solid UI UX Foundation",
            link: "https://codepolitan.com/c/394HPOF",
          },
        ]
      },
      {
        id: "3",
        name: "Front End Basic",
        sub_items: [
          {
            id: "3-1",
            name: "HTML Basics",
            link: "https://codepolitan.com/c/KAUERG2",
          },
          {
            id: "3-2",
            name: "CSS Basics",
            link: "https://codepolitan.com/c/5LZKPW7",
          },
          {
            id: "3-3",
            name: "Learn Bootstrap CSS Framework",
            link: "https://codepolitan.com/c/F9AM2BD",
          },
          {
            id: "3-4",
            name: "Learn JavaScript",
            link: "https://codepolitan.com/c/MD6LYWQ",
          },
          {
            id: "3-5",
            name: "Learn OOP Concepts in JavaScript",
            link: "https://codepolitan.com/c/GURH2ME",
          },
          {
            id: "3-6",
            name: "Learn Asynchronous JavaScript",
            link: "https://codepolitan.com/c/2DFZLEE",
          },
          {
            id: "3-7",
            name: "Learn JavaScript DOM",
            link: "https://codepolitan.com/c/UEMQOEP",
          },
          {
            id: "3-8",
            name: "Learn AJAX and Web API",
            link: "https://codepolitan.com/c/YPKVVZ1",
          },
        ]
      },
      {
        id: "4",
        name: "Front End Intermediate",
        sub_items: [
          {
            id: "4-1",
            name: "JQuery Basics",
            link: "https://codepolitan.com/c/394HPOF",
          },
        ]
      },
    ],
  },


  // {
  //   id: "2",
  //   issuer: "Codepolitan",
  //   items: [
  //     {
  //       id: "1",
  //       name: "Introduction to Computer Programming",
  //       link: "https://codepolitan.com/c/DT5UOY8",
  //     },
  //     {
  //       id: "2",
  //       name: "Algorithms and Basic Programming",
  //       link: "https://codepolitan.com/c/NIHDABO",
  //     },]
  // }
];

// {
//   id: "1",
//     issuer: "Codepolitan",
//       items: [
//         {
//           id: "1",
//           name: "Introduction to Computer Programming",
//           link: "https://codepolitan.com/c/DT5UOY8",
//         },
//         {
//           id: "2",
//           name: "Algorithms and Basic Programming",
//           link: "https://codepolitan.com/c/NIHDABO",
//         },]
// }