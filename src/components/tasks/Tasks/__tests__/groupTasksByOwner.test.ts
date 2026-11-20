import { groupTasksByOwner } from "../groupTasksByOwner"

type Task = components["schemas"]["CaseUserTask"]

const task = (id: number, owner: string | null) =>
  ({ id, owner } as unknown as Task)

describe("groupTasksByOwner", () => {
  it("groups tasks per owner and resolves owner names", () => {
    const groups = groupTasksByOwner(
      [task(1, "u2"), task(2, "u1"), task(3, "u2")],
      new Map([
        ["u1", "Anna"],
        ["u2", "Bram"],
      ]),
    )

    expect(groups).toHaveLength(2)
    expect(groups[0]).toMatchObject({ ownerId: "u1", ownerName: "Anna" })
    expect(groups[0].tasks.map(({ id }) => id)).toEqual([2])
    expect(groups[1]).toMatchObject({ ownerId: "u2", ownerName: "Bram" })
    expect(groups[1].tasks.map(({ id }) => id)).toEqual([1, 3])
  })

  it("keeps unassigned tasks together and puts them last", () => {
    const groups = groupTasksByOwner(
      [task(1, null), task(2, "u1"), task(3, null)],
      new Map([["u1", "Anna"]]),
    )

    expect(groups).toHaveLength(2)
    expect(groups[0]).toMatchObject({ ownerId: "u1", ownerName: "Anna" })
    expect(groups[1]).toMatchObject({
      ownerId: "unassigned",
      ownerName: "Niet toegewezen",
    })
    expect(groups[1].tasks.map(({ id }) => id)).toEqual([1, 3])
  })
})

