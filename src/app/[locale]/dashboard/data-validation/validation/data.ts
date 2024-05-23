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
    title: 'Enterprise root',
    children: [
      {
        id: '2',
        title: 'Business partner 1',
        children: [
          { id: '6', title: 'Project 1' },
          { id: '7', title: 'Project 2' },
          { id: '8', title: 'Project 3' },
        ],
      },
      {
        id: '3',
        title: 'Business partner 2',
        children: [
          { id: '9', title: 'Project 4' },
          { id: '10', title: 'Project 5' },
        ],
      },
      { id: '4', title: 'Business partner 3' },
      { id: '5', title: 'Business partner 4' },
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
