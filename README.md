## Client Installation

- Install dependencies - `yarn install`
- Start client - `yarn start`

## API Installation

- Install .NET v2.2 (TODO - upgrade to v3.1)
- Install SQL Lite Browser - https://sqlitebrowser.org/dl/ (Optional)
- Add an initial Entity Framework migration - `dotnet ef migrations add InitialCreate`\
- Update the database - `dotnet ef database update`
- Run the API - `dotnet watch run`
