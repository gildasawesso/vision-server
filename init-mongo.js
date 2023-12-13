db = db.getSiblingDB('agora_prod');

db.createUser({
  user: 'agora_api',
  pwd: 'lJLiJNql68pdYVH6',
  roles: [
    {
      role: 'readWrite',
      db: 'agora_prod',
    },
  ],
});

db.createCollection('initcollection');
db.initcollection.insert({ initialized: true });
