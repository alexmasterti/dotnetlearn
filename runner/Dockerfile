# Build stage: compile the runner ASP.NET service.
# The Railway build context is the REPO ROOT (so this same Dockerfile
# can be referenced via RAILWAY_DOCKERFILE_PATH=runner/Dockerfile and
# still find its source under runner/).
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY runner/Runner.csproj .
RUN dotnet restore
COPY runner/. .
RUN dotnet publish -c Release -o /publish --no-restore

# Runtime stage: needs the full SDK so we can build/run user code on demand
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS runtime
WORKDIR /app
COPY --from=build /publish .

# Pre-warm: build a hello-world once so NuGet caches and the SDK is ready.
# Subsequent /run requests reuse the global package cache, cutting cold-start
# build time significantly.
RUN mkdir -p /tmp/warm && cd /tmp/warm && \
    dotnet new console --force --no-restore && \
    dotnet build -c Release && \
    rm -rf /tmp/warm

ENV ASPNETCORE_URLS=http://+:8080
ENV DOTNET_NOLOGO=1
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1
EXPOSE 8080
ENTRYPOINT ["dotnet", "Runner.dll"]
