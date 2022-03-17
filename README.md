# prisma-nested-createMany-hack
Create multiple records and multiple related records.

https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-multiple-records-and-multiple-related-records

You cannot access relations in a createMany query, which means that you cannot create multiple users and multiple posts in a single nested write.
This is a small hack to make this possible. Use it at your own risk.
