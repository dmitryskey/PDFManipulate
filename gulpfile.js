const gulp = require('gulp')
const typescript = require('gulp-typescript')
const eslint = require('gulp-eslint')
const { clean, test } = require('gulp-dotnet-cli')
const babel = require('gulp-babel')
const tar = require('gulp-tar')
const gzip = require('gulp-gzip')
const git = require('gulp-git')
const { exec } = require('child_process')
const fs = require('fs')
const fsExtra = require('fs-extra')

const p = 'build/smartformsondemand'
const iTextService = 'backgroundService/iTextService'
const iTextServiceFolder = `${p}/iTextService/linux-x64`
const templateSrc = 'templates/src'
const pdfJS = 'pdf.js'

const run = (cmd, done, cb, cwd) =>
  exec(cmd, { cwd: cwd }, (error, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);

    if (error) {
      done(error);
    } else {
      if (cb) {
        cb(done);
      } else {
        done();
      }
    };
  })

const compile = (formName, done) => {
  const tsProject = typescript.createProject(`${templateSrc}/${formName.replace(/\ /g, '')}/tsconfig.json`, { outFile: `${formName}.js` });
  const tsResult = tsProject.src().pipe(tsProject()).js.pipe(gulp.dest(templateSrc));
  done();
  return tsResult;
}

const lint = (formName, done) => 
  gulp.src([`${templateSrc}/${formName}/*.ts`]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.results(results =>
      done(results.errorCount > 0 ? results : null)))

const cleanFolder = (folder, filter, done) => fsExtra.ensureDir(folder)
  .then(() => fs.promises.readdir(iTextServiceFolder)
    .then(f => f.filter(f => filter.test(f))
      .map(f => fs.promises.unlink(`${folder}/${f}`).catch(err => done(err))))
  .catch(err => done(err)))

gulp.task('build-backgroundservice', done =>
  run(`dotnet publish ${iTextService}/iTextService.csproj --self-contained -r linux-x64 -o ${iTextServiceFolder} -c Release -p:PublishSingleFile=true -p:PublishTrimmed=true`, done))

gulp.task('clean-extra-backgroundservice-files', done => cleanFolder(iTextServiceFolder, /.*\.(pdb|json)/, done))

gulp.task('test-backgroundservice', () => gulp.src('**/*.Test.csproj', { read: false }).pipe(test()))

gulp.task('clean-backgroundservice', () => gulp.src('**/*.csproj', { read: false }).pipe(clean()))

gulp.task('compile-usi9', done => compile('US I9', done))

gulp.task('compile-usi9_supplement', done => compile('US I9 Supplement', done))

gulp.task('compress', done =>
  gulp.src(`${templateSrc}/*.js`)
    .pipe(babel({ comments: false, minified: true }))
    .on('error', err => done(err))
    .pipe(gulp.dest('templates/lib')))

gulp.task('eslint-usi9', done => lint('USI9', done));

gulp.task('eslint-usi9_supplement', done => lint('USI9Supplement', done));

gulp.task('usi9', gulp.series('eslint-usi9', 'compile-usi9'))

gulp.task('usi9-supplement', gulp.series('eslint-usi9_supplement', 'compile-usi9_supplement'))

gulp.task('build-usi9', gulp.series(gulp.parallel('usi9', 'usi9-supplement'), 'compress'))

gulp.task('pdf.js', done =>
  run('git submodule init', done, done => run('git submodule update', done, done =>
    git.checkout('PDFManipulate', { cwd: pdfJS }, err => {
      if (!err) {
        run('npm install && npm audit fix', done, done => run('gulp minified', done, done =>
          git.reset('HEAD', { cwd: 'pdf.js', args: '--hard' }, err => done(err)), pdfJS),
          pdfJS);
      } else {
        done(err);
      }
    }))))

gulp.task('prepare', async done =>
  fs.promises.rmdir('build', { recursive: true })
    .then(() => fs.promises.mkdir('build')
      .then(() => fs.promises.mkdir(p)
        .then(() => fs.promises.mkdir(`${p}/data`)
          .then(() => fs.promises.mkdir(`${p}/db`)
            .then(() => fsExtra.copy('pdf.js/build/minified', `${p}/pdf.js`)
              .then(() => fsExtra.readdir(`${p}/pdf.js`)
                .then(f => f.forEach(g => fsExtra.readdir(`${p}/pdf.js/${g}`)
                  .then(f => f.filter(f => /.*\.(pdf|js\.map)/.test(f)).map(f => fs.promises.unlink(`${p}/pdf.js/${g}/${f}`)
                    .then(() => fsExtra.copy('db/database.db', `${p}/db/fd855348-35cf-41ad-a91f-6097c4b0ccc1`)
                      .then(() => fsExtra.copy('locale', `${p}/locale`)
                        .then(() => fs.promises.readdir('templates')
                          .then(f => f.filter(f => /forms|lib/.test(f)).map(f => fsExtra.copy(`templates/${f}`, `${p}/templates/${f}`)
                            .then(() => fs.promises.readdir('wordpress', { withFileTypes : true })
                              .then(f => f.filter(f => !f.isDirectory()).map(f => fsExtra.copy(`wordpress/${f.name}`, `${p}/wordpress/${f.name}`)
                                .then(() => { gulp.src(`${p}/**/*`).pipe(tar('smartformsondemand.tar')).pipe(gzip()).pipe(gulp.dest('build')); done(); })
                                .catch(err => done(err))))
                              .catch(err => done(err)))
                            .catch(err => done(err)))
                          .catch(err => done(err))))
                        .catch(err => done(err)))
                      .catch(err => done(err))))
                    .catch(err => done(err)))
                  .catch(err => done(err))))
                .catch(err => done(err)))
              .catch(err => done(err)))              
            .catch(err => done(err))
          .catch(err => done(err)))
        .catch(err => done(err))))
      .catch(err =>  done(err))
    .catch(err => done(err))))