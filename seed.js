const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const seeds = {
	table_foo: {
		email: 'yvette@prisma.io',
		name: 'Yvette',
		posts: {
			create: [
				{
					title: 'How to make an omelette',
					categories: {
						create: {
							name: 'Easy cooking',
						},
					},
				},
				{ title: 'How to eat an omelette' },
			],
		},
	},
	table_bar: {
		email: 'vlad@prisma.io',
		posts: {
			connect: [{ id: 8 }, { id: 9 }, { id: 10 }],
		},
	},
	table_baz: {
		title: 'How to make croissants',
		author: {
			connectOrCreate: {
				where: {
					email: 'viola@prisma.io',
				},
				create: {
					email: 'viola@prisma.io',
					name: 'Viola',
				},
			},
		},
	},
}

for (let table in seeds) {
	async function main(table, data) {
		for (let i = 0; i < data.length; i++) {
			await prisma[table].create({ data: data[i] })
		}
	}

	main(table, seeds[table])
		.catch((e) => {
			console.log(
				`\u001b[1;31m---------- Error occured while seeding "${table}". ----------\u001b[0m`
			)
			console.error(e)
			process.exit(1)
		})
		.finally(async () => {
			await prisma.$disconnect()
			return console.log(
				`\u001b[1;32m---------- Seeding "${table}" is complete. ----------\u001b[0m`
			)
		})
}
