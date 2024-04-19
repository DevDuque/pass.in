# Pass.In
<h1 align="center"> 
<img src="public/PassIn_Node.png" height="300px" alt="Pass.In" />
</h1>

## Running the application

To run the program, you need to have [NodeJS](https://nodejs.org/en) installed.

1. Clone the repository to your machine:

```
git clone https://github.com/DevDuque/pass.in
```

Navigate to the directory:
```
cd server
```

3. Install the necessary dependencies:
```
npm install
```

4. Create the database in Prisma:
```
npm run db:migrate
```

5. Populate the database:
```
npm run db:seed
```

6. Verify if everything was created correctly (Prisma Studio will be available at [localhost](http://localhost:5555) in your browser).
```
npm run db:studio
```

5. Start the development server:
```
npm run dev
```
6. The server will be ready to receive requests ([Request Examples](server/api.http)).
