if User.count.zero?
  User.create(
    admin: true,
    email: "tprats108@gmail.com",
    first_name: "Tom",
    last_name: "Prats",
    password: "password"
  )
end

if Page.count.zero?
  Page.create(
    active: true,
    rank: 50,
    path: "contact",
    name: "Contact"
  )
end
