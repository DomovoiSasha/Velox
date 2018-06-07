const gulp = require('gulp');
const watch = require('gulp-watch');
const bs = require('browser-sync').create();
const pug = require('gulp-pug');
const del = require('del');
const rupture = require('rupture');
const stylint = require('gulp-stylint');
const stylus = require('gulp-stylus');
const autoprefixer = require('autoprefixer-stylus');
const importIfExist = require('stylus-import-if-exist');
const gcmq = require('gulp-group-css-media-queries');
const nano = require('gulp-cssnano');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const svgSymbols = require('gulp-svg-symbols');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
const path = require('path');
const imgmin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith-multi');
const merge = require('merge-stream');
const uglify = require('gulp-uglify');

const tmplName = 'stylus_retina.template.handlebars';
const tmplPath = 'node_modules/spritesmith-stylus-retina-template';

gulp.task('png', function () {
  var spriteData = gulp.src('app/sprites/**/*.png')
    .pipe(spritesmith({
      spritesmith: function (options) {
        options.imgPath = '../images/' + options.imgName
				options.cssName = options.cssName.replace(/\.css$/, '.styl');
				options.cssFormat = 'stylus';
				options.cssTemplate = path.join(__dirname, tmplPath, tmplName);
				options.algorithm = 'binary-tree';
				options.padding = 8;
      }
    }))
  var imgStream = spriteData.img
    .pipe(gulp.dest('dist/assets/images'))
  var cssStream = spriteData.css
    .pipe(gulp.dest('app/sprites/png-sprite'))
  return merge(imgStream, cssStream)
});
		

gulp.task('icons', () => (
	gulp.src('app/sprites/**/*.svg')
		.pipe(plumber({errorHandler: errorHandler(`Error in 'icons' task`)}))
		.pipe(svgSymbols({
			title: false,
			id: 'icon_%f',
			class: '%f',
			templates: [
				path.join(__dirname, 'node_modules/stylus-svg-size-template/svg-size.styl'),
				'default-svg'
			]
		}))
		.pipe(gulpIf(/\.styl$/, gulp.dest('app/styles')))
		.pipe(gulpIf(/\.svg$/, rename('icon.svg')))
		.pipe(gulpIf(/\.svg$/, gulp.dest('dist/assets/images/')))
));


gulp.task('img', function(){
	return gulp.src('app/images/*.*')
		.pipe(imgmin())
		.pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('css', function(){
	return gulp.src('app/styles/app.styl')
		.pipe(stylint())
		.pipe(stylus({
			use: [
				rupture(),
				autoprefixer()
			],
			'include css': true
		}))
		.pipe(gcmq())
		.pipe(nano({zindex: false}))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('dist/assets/styles/'));
});

gulp.task('html', function(){
	return gulp.src('app/index.pug')
		.pipe(pug())
		.pipe(gulp.dest('dist'));
});

gulp.task('copy', function(){
	return gulp.src('app/fonts/*/*.*')
		.pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copyjs', function(){
	return gulp.src('app/scripts/libs/*.js')
		.pipe(uglify())
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('js', function() {
	return gulp.src('app/scripts/script.js')
		.pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('build', gulp.series('img', 'icons', 'css', 'html', 'copy', 'copyjs', 'js'));

gulp.task('clean', function(){
	return del('dist');
});

gulp.task('watch', function(){
	gulp.watch(('app/index.pug'), gulp.series('html'));
	gulp.watch(('app/styles/*.*'), gulp.series('css', 'html'));
	gulp.watch(('app/scripts/*'), gulp.series('js', 'html'));
});

gulp.task('server', function(){
	bs.init({
		server: 'dist'
	});
	bs.watch('dist/**/*.*').on('change', bs.reload);
});

gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('watch', 'server')));