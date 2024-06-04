type TreeData = {
  index: string
  canMove: boolean
  isFolder: boolean
  children: string[]
  data: string
  canRename: boolean
}

type TreeItems = Record<string, TreeData>

const data = [
  {
    id: '1',
    title: 'NG-blu',
    children: [
      {
        id: '2',
        title: 'Addresses',
        children: [
          { id: '7', title: 'Address 1: Visit Address' },
          { id: '8', title: 'Address 2: Postal Address' },
          { id: '9', title: 'Address 3: Invoice Address' },
        ],
      },
      {
        id: '3',
        title: 'Contacts',
        children: [
          { id: '10', title: 'Contact 1' },
          { id: '11', title: 'Contact 2' },
        ],
      },
      { id: '4', title: 'Users' },
      {
        id: '5',
        title: 'Business partners',
        children: [
          { id: '12', title: 'Business partner 1: Microsoft' },
          { id: '13', title: 'Business partner 2: Apple' },
          { id: '14', title: 'Business partner 3: NVDIA' },
        ],
      },
      {
        id: '6',
        title: 'Organization units',
        children: [
          { id: '15', title: 'Business partner 1: Microsoft Indonesia' },
          { id: '16', title: 'Business partner 2: Apple Singapore' },
        ],
      },
    ],
  },
]

const covertDataToTreeData = (template: typeof data): TreeItems => {
  const tree: TreeItems = {
    root: {
      index: 'root',
      canMove: false,
      isFolder: true,
      children: template.map(item => item.id),
      data: 'root',
      canRename: false,
    },
  }

  const convertChildren = (children: any) => {
    return children.map((child: any) => {
      const id = child.id
      tree[id] = {
        index: id,
        canMove: true,
        isFolder: true,
        children: child.children ? child.children.map((c: any) => c.id) : [],
        data: child.title,
        canRename: true,
      }

      if (child.children) {
        convertChildren(child.children)
      }
    })
  }

  template.forEach(item => {
    tree[item.id] = {
      index: item.id,
      canMove: true,
      isFolder: true,
      children: item.children.map(child => child.id),
      data: item.title,
      canRename: true,
    }

    convertChildren(item.children)
  })

  return tree
}

export const convertedList = covertDataToTreeData(data)
